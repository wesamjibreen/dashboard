
import { useStorage } from '@vueuse/core'

// type ActivePanelId = 'none' | 'search' | 'languages' | 'activity' | 'task'

export const activePanel = useStorage('active-panel', 'none');
