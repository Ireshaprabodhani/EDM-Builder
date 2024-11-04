// src/components/EDMBuilder/services/HistoryManager.js

export default class HistoryManager {
    constructor({ onChange }) {
      this.history = [];
      this.currentIndex = -1;
      this.onChange = onChange;
    }
  
    push(state) {
      // Remove any future states if we're not at the end
      this.history = this.history.slice(0, this.currentIndex + 1);
      this.history.push(JSON.parse(JSON.stringify(state)));
      this.currentIndex++;
      this.onChange?.(this.getCurrentState(), this.currentIndex);
    }
  
    undo = () => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.onChange?.(this.getCurrentState(), this.currentIndex);
      }
    }
  
    redo = () => {
      if (this.currentIndex < this.history.length - 1) {
        this.currentIndex++;
        this.onChange?.(this.getCurrentState(), this.currentIndex);
      }
    }
  
    getCurrentState() {
      return this.history[this.currentIndex];
    }
  }