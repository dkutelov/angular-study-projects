import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  visible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() {}

  register(id: string) {
    const newModal = { id, visible: false };
    this.modals.push(newModal);
  }

  // otherwise - memory leak since every modal will stay in the array
  unregister(id: string) {
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  isModalOpen(id: string): boolean {
    return !!this.getModal(id)?.visible;
  }

  toggleModal(id: string) {
    const modal = this.getModal(id);
    if (modal) {
      modal.visible = !modal.visible;
    }
  }

  getModal(id: string) {
    return this.modals.find((x) => x.id === id);
  }
}
