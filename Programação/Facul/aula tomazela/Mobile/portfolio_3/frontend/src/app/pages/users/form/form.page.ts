import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { UserService } from '../../../core/services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss']
})
export class UserFormPage implements OnInit {
  @Input() user?: User;

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue({
        name: this.user.name,
        email: this.user.email
      });
      this.form.controls.password.clearValidators();
      this.form.controls.password.updateValueAndValidity();
      return;
    }

    this.form.controls.password.setValidators([Validators.required, Validators.minLength(6)]);
    this.form.controls.password.updateValueAndValidity();
  }

  close(): void {
    void this.modalCtrl.dismiss();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.form.getRawValue();

    if (this.user) {
      this.userService.update(this.user.id, { name: name as string, email: email as string }).subscribe(() => {
        void this.modalCtrl.dismiss({ refresh: true });
      });
      return;
    }

    this.userService
      .create({
        name: name as string,
        email: email as string,
        password: password as string
      })
      .subscribe(() => {
        void this.modalCtrl.dismiss({ refresh: true });
      });
  }
}
