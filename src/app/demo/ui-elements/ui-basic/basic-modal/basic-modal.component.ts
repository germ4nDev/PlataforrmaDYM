// angular import
import { Component, ElementRef } from '@angular/core';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// bootstrap import
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-basic-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './basic-modal.component.html',
  styleUrls: ['./basic-modal.component.scss']
})
export default class BasicModalComponent {
  // private Props
  closeResult = '';

  // constructor
  constructor(private modalService: NgbModal) {}

  // private Method
  open(content: ElementRef) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openTooltip(content4: ElementRef) {
    this.modalService.open(content4, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openGrid(content5: ElementRef) {
    this.modalService.open(content5, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  OpenMdo(content15: ElementRef) {
    this.modalService.open(content15, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  OpenFat(content16: ElementRef) {
    this.modalService.open(content16, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  OpenBootstrap(content17: ElementRef) {
    this.modalService.open(content17, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openScrollableContent(content1: ElementRef) {
    this.modalService.open(content1, { scrollable: true });
  }

  openVerticallyCentered(content2: ElementRef) {
    this.modalService.open(content2, { centered: true });
  }

  openSm(content7: ElementRef) {
    this.modalService.open(content7, { size: 'sm' });
  }

  openLg(content6: ElementRef) {
    this.modalService.open(content6, { size: 'lg' });
  }

  openFirstModal(content8: ElementRef) {
    this.modalService.open(content8, { centered: true });
  }

  OpenSeconde(content9: ElementRef) {
    this.modalService.open(content9, { centered: true });
  }

  openFullscreen(content10: ElementRef) {
    this.modalService.open(content10, { fullscreen: true });
  }

  openFullscreenSm(content11: ElementRef) {
    this.modalService.open(content11, { fullscreen: 'sm' });
  }

  openFullscreenMd(content12: ElementRef) {
    this.modalService.open(content12, { fullscreen: 'md' });
  }

  openFullscreenLg(content13: ElementRef) {
    this.modalService.open(content13, { fullscreen: 'lg' });
  }

  openFullscreenXl(content14: ElementRef) {
    this.modalService.open(content14, { fullscreen: 'xl' });
  }

  // private method
  private getDismissReason(reason: ModalDismissReasons): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
