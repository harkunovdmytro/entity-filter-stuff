import {Component} from '@angular/core';

export interface IActivityType {
  id: number;
  name: string;
  description: string;
  entityId: number | null;
}

export interface IActivitySubtype {
  id: number;
  activityTypeId: number;
  name: string;
  entityId: number | null;
}

export interface IActivityTypesForView {
  activityType: IActivityType;
  activitySubtypes: IActivitySubtype[];
}

const activityTypes: IActivityType[] = [
  {
    id: 0,
    name: 'Dance',
    description: 'Dancing',
    entityId: 1,
  }, {
    id: 1,
    name: 'Run',
    description: 'Running',
    entityId: 1,
  }, {
    id: 2,
    name: 'Archery',
    description: 'Bows&Arrows',
    entityId: null,
  },
];

const activitySubtypes: IActivitySubtype[] = [
  {
    id: 0,
    activityTypeId: 0,
    name: 'Latin Dance',
    entityId: 1,
  }, {
    id: 1,
    activityTypeId: 0,
    name: 'Folk Dance',
    entityId: null,
  }, {
    id: 2,
    activityTypeId: 0,
    name: 'Break-dance',
    entityId: 1,
  }, {
    id: 3,
    activityTypeId: 1,
    name: '100m',
    entityId: 1,
  }, {
    id: 4,
    activityTypeId: 1,
    name: 'Marathon',
    entityId: null,
  }, {
    id: 5,
    activityTypeId: 2,
    name: 'People Hunting',
    entityId: null,
  }, {
    id: 6,
    activityTypeId: 2,
    name: 'Aiming',
    entityId: null,
  }
];


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  public currentEntityId = 1;

  public chosenActivityTypeId: number | null = null;

  public activityTableView: IActivityTypesForView[] = [];
  public activityTypes: IActivityType[] = [];
  public activitySubtypes: IActivitySubtype[] = [];

  // Helpers
  public entityActivityTypes = new Set<number>();
  public entityActivitySubtypes = new Set<number>();

  constructor() {
    this.onShowModal(this.currentEntityId);
    this.chooseActivityType(null);
  }

  public onShowModal(currentEntityId: number): void {
    this.activityTypes = activityTypes;
    this.activitySubtypes = activitySubtypes;

    this.activityTableView = this.activityTypes
      .filter(type => type.entityId === currentEntityId)
      .map((type) => ({
        activityType: type,
        activitySubtypes: this.activitySubtypes
          .filter(subtype => subtype.activityTypeId === type.id && subtype.entityId)
      }));
  }

  public chooseActivityType(activityTypeId: number | null): void {
    this.chosenActivityTypeId = activityTypeId;

    if (typeof activityTypeId === 'number') {
      this.activitySubtypes = activitySubtypes.filter(subtype => subtype.activityTypeId === activityTypeId);
      return;
    }

    this.activitySubtypes = [];
  }

  public selectActivityType(type: IActivityType): void {
    this.entityActivityTypes.add(type.id);
    this.activityTableView.push(this.parseActivityTypeToActivityTypeForView(type));
  }

  public deleteActivityType(activityTypeId: number): void {
    this.entityActivityTypes.delete(activityTypeId);
    this.activityTableView = this.activityTableView.filter(type => type.activityType.id !== activityTypeId);
  }

  public selectActivitySubtype(subtype: IActivitySubtype): void {
    this.entityActivitySubtypes.add(subtype.id);

    const chosenEntityActivityType = this.activityTableView
      .find(type => type.activityType.id === this.chosenActivityTypeId);

    this.chooseActivityType(null);
    if (!chosenEntityActivityType) return

    chosenEntityActivityType.activitySubtypes.push(subtype);
  }

  public deleteActivitySubtype(activitySubtypeId: number): void {
    this.entityActivitySubtypes.delete(activitySubtypeId);
    this.activityTableView = this.activityTableView
      .map(type => ({
        ...type,
        activitySubtypes: type.activitySubtypes
          .filter(subtype => subtype.id !== activitySubtypeId)
      }));
  }

  private parseActivityTypeToActivityTypeForView(activityType: IActivityType): IActivityTypesForView {
    return {
      activityType,
      activitySubtypes: []
    };
  }

  public get excludedActivityTypes(): IActivityType[] {
    return this.activityTypes.filter(type => !this.entityActivityTypes.has(type.id));
  }

  public get excludedActivitySubtypes(): IActivitySubtype[] {
    return this.activitySubtypes.filter(subtype => !this.entityActivitySubtypes.has(subtype.id));
  }
}
