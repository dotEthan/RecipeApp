import { query, style, transition, trigger, group, animate } from '@angular/animations';

const animationLR = [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'absolute' })
    , { optional: true }),
    /* 2 */ group([  // block executes in parallel
        query(':enter', [
            style({ transform: 'translateX(-100vw)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(100vw)' }))
        ], { optional: true }),
    ])
];

const animationRL = [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'absolute' })
    , { optional: true }),
    /* 2 */ group([  // block executes in parallel
        query(':enter', [
            style({ transform: 'translateX(100vw)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(0)' }))
        ], { optional: true }),
        query(':leave', [
            style({ transform: 'translateX(0)' }),
            animate('0.5s ease-in-out', style({ transform: 'translateX(-100vw)' }))
        ], { optional: true }),
    ])
];

export const slideInAnimation =
    trigger('routeAnimations', [
        transition('HomePage => RecipePage', animationRL),
        transition('RecipePage => HomePage', animationLR),
        transition('HomePage => ShoppingListPage', animationRL),
        transition('ShoppingListPage => HomePage', animationLR),
        transition('RecipePage => ShoppingListPage', animationRL),
        transition('ShoppingListPage => RecipePage', animationLR),
    ]);