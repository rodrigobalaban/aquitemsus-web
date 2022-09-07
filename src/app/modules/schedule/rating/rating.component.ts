import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Establishment, Rating } from 'src/app/shared/models';
import { MessageService } from 'src/app/shared/services';
import { RatingService, ScheduleService } from '../services';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _activateRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _messageService: MessageService,
    private _ratingService: RatingService,
    private _router: Router,
    private _scheduleService: ScheduleService
  ) {
    this.form = this._formBuilder.group(this.buildFormControls());
  }

  ngOnInit(): void {
    const scheduleId: number = this._activateRoute.snapshot.params.id;
    this.setSchedule(scheduleId);
  }

  buildFormControls() {
    return {
      id: [null],
      value: [5, [Validators.min(1), Validators.max(5)]],
      comment: [null],
      schedule: [null, Validators.required],
    };
  }

  async setSchedule(scheduleId: number): Promise<void> {
    const schedule = await this._scheduleService.getById(scheduleId);
    this.form.patchValue({ schedule });
  }

  get establishment(): Establishment {
    return this.form.get('schedule')?.value?.establishment;
  }

  get starValue(): number {
    return this.form.get('value')?.value;
  }

  setStarValue(value: number) {
    this.form.patchValue({ value });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const rating: Rating = this.form.getRawValue();
    await this.save(rating);

    this.returnToList();
  }

  private async save(record: Rating) {
    await this._ratingService.save(record);
    this._messageService.show('Avaliação realizada com sucesso!');
  }

  returnToList(): void {
    this._router.navigate(['agendamentos']);
  }
}
