# Бекграунд

- Что такое логический гейт
- Булева алгебра

## Логические гейты

Прочитайте, что такое HDL -> hardware/logic-gates/HDL.md

Установите практические задания -> инструкция.

На языке HDL реализуйте элементарные гейты: `NOT, AND, OR, XOR` и два простейших чипа `MUX`, `DMUX`.

Забываем о внутренней реализации гейтов, используем их интерфейсы. Собираем элементарные логические гейты друг из друга.

## Перевод функции → в hdl-схему

Представим, что мы Стив Возняк.

```basic
'↓ функция ↓
f = x*y + z

'↓ перевод в HDL ↓
x*y = And(a=x, b=y, out=xANDy);
x*y + z = Or(a=xANDy, b=z, out=out);
```

```basic
'↓ функция ↓
f = x*y + !x*y + !y*z

'↓ перевод в HDL ↓
x*y = And(a=x, b=y, out=xANDy);
!x*y = And(a=!x, b=y, out=!xANDy);
!y*z = And(a=z, b=!y, out=zAND!y);
x*y + !x*y + !y*z = Or(a=xANDy, b=!xANDy, c=zAND!y, out=out); '⬅ Or3Way, OR gate which takes 3 inputs

'SOP function = sum Of Products;
```

```basic
'↓ функция ↓
f = (y+z) * (x+y+z) * (!y+!z)

'↓ перевод в HDL ↓
Or(a=y, b=z, out=yORz);
Or(a=x, b=y, c=z, out=xORyORz); '⬅ Or3Way
Or(a=!y, b=!z, out=!yOR!z);
And(a=yORz, b=xORyORz, c=!yOR!z, out=out); '⬅ And3Way

'POS function = Product Of Sums;
```
