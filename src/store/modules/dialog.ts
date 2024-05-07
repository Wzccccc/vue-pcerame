import { defineStore } from "pinia";
import { DialogListState, DialogState } from "../interface";

export const dialogStore = defineStore("dialog", {
  state: (): DialogListState => ({
    dialogList: []
  }),
  actions: {
    addDragDialog(dialogLead: DialogState) {
      this.dialogList.push(dialogLead);
    },
    deleteDialog(id: string) {
      this.dialogList = this.dialogList.filter(item => {
        item.close();
        return item.id !== id;
      });
    }
  }
});
