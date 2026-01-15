import { animate, animation, style, sequence } from "@angular/animations";

export const flashAnimation = animation([
    sequence([
        animate('{{ time}}', style({
            'background-color': '{{ flashColor }}'
        })),
        animate('{{ time}}', style({
            'background-color': 'rgb(255, 255, 255)',
        }))
    ])
])