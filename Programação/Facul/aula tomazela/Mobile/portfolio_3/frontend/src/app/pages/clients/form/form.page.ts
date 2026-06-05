import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';

import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'app-client-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss']
})
export class ClientFormPage implements OnInit {
  @Input() client?: Client;

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.email]],
    phone: [''],
    cpf: [''],
    address: ['']
  });

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    if (!this.client) {
      return;
    }

    this.form.patchValue({
      name: this.client.name,
      email: this.client.email || '',
      phone: this.client.phone || '',
      cpf: this.client.cpf || '',
      address: this.client.address || ''
    });

    this.form.controls.cpf.disable();
  }

  close(): void {
    void this.modalCtrl.dismiss();
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      name: this.form.value.name as string,
      email: (this.form.value.email as string) || '',
      phone: (this.form.value.phone as string) || '',
      cpf: (this.form.getRawValue().cpf as string) || '',
      address: (this.form.value.address as string) || ''
    };

    if (this.client) {
      this.clientService
        .update(this.client.id, {
          name: payload.name,
          email: payload.email,
          phone: payload.phone,
          address: payload.address
        })
        .subscribe(() => {
          void this.modalCtrl.dismiss({ refresh: true });
        });
      return;
    }

    this.clientService.create(payload).subscribe(() => {
      void this.modalCtrl.dismiss({ refresh: true });
    });
  }
}
