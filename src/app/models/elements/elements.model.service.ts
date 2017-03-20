import {Injectable} from '@angular/core';

@Injectable()
export class ElementsModelService {
  getElements() {
    return [
      {
        name: 'Portfolio',
        state: 'expanded',
        type: 'organization',
        hide: false,
        locked: true,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate',
        rate: 3,
        level: 1
      },
      {
        name: 'Company',
        state: 'expanded',
        type: 'company',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 2,
        level: 2
      },
      {
        name: 'Program',
        state: 'expanded',
        type: 'program',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 4,
        level: 3
      },
      {
        name: 'Strategy 1',
        state: 'expanded',
        type: 'strategy',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 4,
        level: 4
      },
      {
        name: 'Initiative 1-1',
        state: 'expanded',
        type: 'initiative',
        comment: '',
        hide: false,
        locked: true,
        rate: 2,
        level: 5
      },
      {
        name: 'Initiative 1-2',
        state: 'expanded',
        type: 'initiative',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 1,
        level: 5
      },
      {
        name: 'Initiative 1-3',
        state: 'expanded',
        type: 'initiative',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 1,
        level: 5
      },
      {
        name: 'Strategy 2',
        state: 'expanded',
        type: 'strategy',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 4,
        level: 4
      },
      {
        name: 'Initiative 2-1',
        state: 'expanded',
        type: 'initiative',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 4,
        level: 5
      },
      {
        name: 'Initiative 2-2',
        state: 'expanded',
        type: 'initiative',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 3,
        level: 5
      },
      {
        name: 'Initiative 2-3',
        state: 'expanded',
        type: 'initiative',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 3,
        level: 5
      },
      {
        name: 'Strategy 3',
        state: 'expanded',
        type: 'strategy',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 5,
        level: 4
      },
      {
        name: 'Initiative 3-1',
        state: 'expanded',
        type: 'initiative',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 1,
        level: 5
      },
      {
        name: 'Initiative 3-2',
        state: 'expanded',
        type: 'initiative',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 2,
        level: 5
      },
      {
        name: 'Initiative 3-3',
        state: 'expanded',
        type: 'initiative',
        lead: 'M. Habner',
        comment: '',
        hide: false,
        locked: true,
        rate: 4,
        level: 5
      }
    ];
  }
}
