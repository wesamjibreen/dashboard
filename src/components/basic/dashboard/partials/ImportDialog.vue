<template>
  <GDialog
    v-model="dialog"
    :persistent="isUploading"
    max-width="600"
    height="400"
    scrollable
  >
    <div class="block mx-4 my-4 w-100">
      <!-- <VButton @click="closeDialog()" outlined class="ml-1 mr-1">
            {{ trans("cancel") }}
          </VButton> -->

      <!-- sample -->
      <div class="block is-full mt-5 pt-5 is-centered">
        <h5 class="mb-3">{{ trans("download_sample_text") }}</h5>
        <VButton
          color="warning w-100"
          icon="fas fa-download"
          elevated
          class="btn-list"
          @click="downloadImportSample"
        >
          {{ trans("download_sample") }}
        </VButton>
      </div>
      <!-- import file -->
      <hr class="my-7" />
      <!-- pick file -->
      <div v-if="!isUploadingFile && !isFileSelected">
        <h4 class="mb-3">{{ trans("pick_file_text") }}</h4>

        <div class="file has-name">
          <label class="file-label">
            <input
              class="file-input"
              type="file"
              accept=".xlsx"
              @change="onPickFile"
              name="resume"
            />
            <span class="file-cta">
              <span class="file-icon">
                <i class="fas fa-upload mx-4"></i>
              </span>
              <span class="file-label"> {{ trans("pick_file") }} </span>
            </span>
          </label>
        </div>
      </div>
      <!-- upload file -->

      <div v-if="!isUploading && isFileSelected">
        <!-- upload button -->
        <!-- <h4 class="mb-3">{{ trans("upload_file_text") }}</h4> -->

        <div class="file-name-row">
          <h5 class="">{{ pickedFile.name }}</h5>
          <VButton
            color="danger"
            elevated
            class="btn-list"
            @click="pickedFile = {}"
          >
            {{ trans("X") }}
          </VButton>
        </div>
        <VButton
          color="primary"
          icon="fas fa-upload"
          elevated
          class="btn-list w-100 mt-2"
          @click="uploadFile"
        >
          {{ trans("upload_file") }}
        </VButton>
      </div>
      <!-- uploading file -->
      <div v-if="isUploading">
        <h5>{{ trans("uploading") }}</h5>
        <!-- loader -->
        <progress class="progress is-small is-primary" max="100"></progress>
      </div>
    </div>
  </GDialog>
</template>


<script>
import { GDialog } from "gitart-vue-dialog";
import readXlsxFile from "read-excel-file";
import { Notyf } from "notyf";

export default {
  props: {
    resource: {
      required: true,
    },
  },
  components: {
    GDialog,
  },
  mounted() {},
  data() {
    return {
      dialog: false,
      isUploading: false,
      pickedFile: {},
    };
  },
  computed: {
    isFileSelected() {
      return this.pickedFile instanceof File;
    },
  },
  methods: {
    // modal
    openDialog() {
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
    },
    // sample
    downloadImportSample() {
      this.$emit("on-sample-button-click");
    },
    // pick file
    onPickFile() {
      const file = event.target.files[0];
      this.pickedFile = file;
    },
    // upload file
    uploadFile() {
      this.isUploading = true;
      // read & prepare data
      const xlsxFile = this.pickedFile;
      const data = [];
      readXlsxFile(xlsxFile).then((rows) => {
        const columns = rows[0];
        for (let i = 0; i < rows.length; i++) {
          if (i !== 0) {
            const rowObject = {};
            for (let y = 0; y < rows[i].length; y++) {
              rowObject[columns[y]] = rows[i][y];
            }
            data.push(rowObject);
          }
        }

        var notyf = new Notyf();
        this.request(
          { method: "POST", url: `/api/admin/${this.resource}/import` },
          {
            data,
          },
          function (response) {
            const data = response.data.data;

            this.pickedFile = {};
            this.isUploading = false;

            // show feedback message
            notyf.success("Data imported successfully.");
            this.closeDialog();
            Bus.emit(`reload-table-${this.resource}`);
          }.bind(this),
          function (response) {
            console.log("REQ error", response);
            notyf.error("An error happened, please try again.");
            this.isUploading = false;
          }.bind(this)
        );
      });
    },
  },
};
</script>

<style lang="scss">
.w-100 {
  width: 100%;
}

.file > .file-label {
  display: block;
  width: 100%;
}

.file-cta {
  display: flex;
  justify-content: center;
  border-radius: 5px !important;
}

.file-name-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
