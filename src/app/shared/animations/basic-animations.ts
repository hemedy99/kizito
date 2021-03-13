
import {animate, group, keyframes, query, stagger, state, style, transition, trigger} from '@angular/animations';


export const tableSize = trigger('tableSize', [
  state('eighty' , style({
    'width': '62%',
    'margin-right': '2%',
    'float': 'left'
  })),
  state('sixty' , style({
    'width': '42%',
    'margin-right': '2%',
    'float': 'left'
  })),
  state('largeForm' , style({
    'width': '23%',
    'margin-right': '2%',
    'float': 'left'
  })),
  state('full' , style({
    'width': '0%',
    'margin-right': '0%',
    'opacity': '0',
    'float': 'left'
  })),
  state('hundred', style({
    'width': '100%',
    'float': 'left'
  })),
  transition('eighty <=> hundred', animate('300ms')),
  transition('sixty <=> hundred', animate('300ms')),
  transition('largeForm <=> hundred', animate('300ms')),
  transition('full <=> hundred', animate('300ms'))
]);

export const formSize = trigger('formSize', [
    state('twenty', style({
      'width': '36%',
      'float': 'left',
      'transform': 'scale(1, 1)'
    })),
    state('sixty', style({
      'width': '56%',
      'float': 'left',
      'transform': 'scale(1, 1)'
    })),
    state('largeForm', style({
      'width': '75%',
      'float': 'left',
      'transform': 'scale(1, 1)'
    })),
    state('full', style({
      'width': '100%',
      'float': 'left',
      'transform': 'scale(1, 1)'
    })),
    state('zero', style({
      'width': '0px',
      'float': 'left',
      'display': 'none',
      'transform': 'scale(0, 0)',
    })),
    transition('twenty => zero', group([
      animate('300ms', style({opacity: 0})),
      animate('300ms', style({'width': '0px'})),
      animate('300ms', style({transform: 'scale(0, 0)'}))
    ])),
    transition('zero => twenty', group([
      animate('300ms', style({opacity: 1})),
      animate('300ms', style({'width': '36%'})),
      animate('300ms', style({transform: 'scale(1, 1)'}))
    ])),
    transition('sixty => zero', group([
      animate('300ms', style({opacity: 0})),
      animate('300ms', style({'width': '0px'})),
      animate('300ms', style({transform: 'scale(0, 0)'}))
    ])),
    transition('zero => sixty', group([
      animate('300ms', style({opacity: 1})),
      animate('300ms', style({'width': '56%'})),
      animate('300ms', style({transform: 'scale(1, 1)'}))
    ])),
    transition('largeForm => zero', group([
      animate('300ms', style({opacity: 0})),
      animate('300ms', style({'width': '0px'})),
      animate('300ms', style({transform: 'scale(0, 0)'}))
    ])),
    transition('zero => largeForm', group([
      animate('300ms', style({opacity: 1})),
      animate('300ms', style({'width': '75%'})),
      animate('300ms', style({transform: 'scale(1, 1)'}))
    ])),
    transition('full => zero', group([
      animate('300ms', style({opacity: 0})),
      animate('300ms', style({'width': '0px'})),
      animate('300ms', style({transform: 'scale(0, 0)'}))
    ])),
    transition('zero => full', group([
      animate('300ms', style({opacity: 1})),
      animate('300ms', style({'width': '100%'})),
      animate('300ms', style({transform: 'scale(1, 1)'}))
    ]))
  ]);

export const visibilityChanged = trigger('visibilityChanged', [
  state('notHovered' , style({
    'transform': 'scale(1, 1)',
    '-webkit-box-shadow': '0 0 0px rgba(0,0,0,0.1)',
    'box-shadow': '0 0 0px rgba(0,0,0,0.2)',
    'background-color': 'rgba(0,0,0,0.0)',
    'border': '0px solid #ddd'
  })),
  state('hoovered', style({
    'transform': 'scale(1.02, 1.02)',
    '-webkit-box-shadow': '0 0 10px rgba(0,0,0,0.2)',
    'box-shadow': '0 0 10px rgba(0,0,0,0.1)',
    'background-color': 'rgba(0,0,0,0.02)',
    'border': '1px solid #ddd'
  })),
  transition('notHovered <=> hoovered', animate('300ms'))
]);

export const hiddenItem = trigger('hiddenItem', [
    state('notHidden' , style({
      'transform': 'scale(1, 1)'
    })),
    state('hidden', style({
      'transform': 'scale(0.0, 0.00)',
      'visibility': 'hidden',
      'height': '0px'
    })),
    transition('notHidden => hidden', animate('500ms')),
    transition('hidden => notHidden', animate('200ms'))
  ]);

export const fadeIn = trigger('fade', [
    state('void', style({opacity: 0})),
    transition(':enter', animate('300ms ease-in')),
    transition(':leave', animate('300ms ease-in'))
  ]);

export const fadeSmooth = trigger('fadeSmooth', [
    state('void', style({opacity: 0.3})),
    transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        group([
          animate('300ms', style({transform: 'translateX(0)'})),
          animate('500ms', style({opacity: 1}))
        ])
      ]
    ), transition(':leave', [
      style({transform: 'translateX(0)'}),
      group([
        animate('500ms', style({transform: 'translateX(100%)'})),
        animate('500ms', style({opacity: 0}))
      ])
    ]
  )
  ]);

export const fromTop = trigger('fromTop', [
    state('void', style({opacity: 0.3})),
    transition(':enter', [
        style({transform: 'translateY(-100px)'}),
        group([
          animate('300ms', style({transform: 'translateY(0)'})),
          animate('300ms', style({opacity: 1}))
        ])
      ]
    ), transition(':leave', [
      style({transform: 'translateY(0)'}),
      group([
        animate('300ms', style({transform: 'translateY(-100%)'})),
        animate('500ms', style({opacity: 0}))
      ])
    ]
  )
  ]);

export const listStateTrigger = trigger('listState', [
  transition('* => *', [
    query(':enter', [
      style({
        opacity: 0,
        transform: 'translateX(-20%)'
      }),
      stagger(100, [
        group([animate('400ms ease-out',
          style({
            opacity: 1,
            offset: 1
          })
        ), animate('300ms ease-out',
          style({
            transform: 'translateX(0)',
          })
        )])

      ])
    ], {optional: true})
  ])
]);

export const topListStateTrigger = trigger('topListState', [
  transition('* => *', [
    query(':enter', [
      style({
        opacity: 0,
        transform: 'translateY(70px)'
      }),
      stagger(100, [
        group([animate('400ms ease-out',
          style({
            opacity: 1,
            offset: 1
          })
        ), animate('300ms ease-out',
          style({
            transform: 'translateY(0)',
          })
        )])

      ])
    ], {optional: true})
  ])
]);

export const fadeOut = trigger('fadeOut', [
    state('void', style({opacity: 0})),
    transition(':enter', animate('300ms ease-in'))
  ]);

export const fadeOut1 = trigger('fadeOut', [
    state('void', style({opacity: 0})),
    transition(':enter', animate('500ms'))
  ]);


export const zoomCard = trigger('zoomCard', [
  state('normal' , style({
    'transform': 'scale(1, 1)'
  })),
  state('zoomed', style({
    'position': 'absolute',
    'top': '5%',
    'left': '5%',
    'bottom': '5%',
    'right': '5%',
    'z-index': '10000',
    'background-color': 'wheat'
  })),
  transition('normal <=> zoomed', animate('500ms'))
]);
