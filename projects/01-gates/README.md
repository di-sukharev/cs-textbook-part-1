### Перевод функции → в hdl-схему

```visual-basic
'↓ функция ↓
f = x*y + z

'↓ перевод в HDL ↓
x*y = And(a=x, b=y, out=xANDy);
x*y + z = Or(a=xANDy, b=z, out=out);
```

```visual-basic
'↓ функция ↓
f = x*y + !x*y + !y*z

'↓ перевод в HDL ↓
x*y = And(a=x, b=y, out=xANDy);
!x*y = And(a=!x, b=y, out=!xANDy);
!y*z = And(a=z, b=!y, out=zAND!y);
x*y + !x*y + !y*z = Or(a=xANDy, b=!xANDy, c=zAND!y, out=out); '⬅ Or3Way, OR gate which takes 3 inputs

'SOP function = Summ Of Products;
```

```visual-basic
'↓ функция ↓
f = (y+z) * (x+y+z) * (!y+!z)

'↓ перевод в HDL ↓
Or(a=y, b=z, out=yORz);
Or(a=x, b=y, c=z, out=xORyORz); '⬅ Or3Way
Or(a=!y, b=!z, out=!yOR!z);
And(a=yORz, b=xORyORz, c=!yOR!z, out=out); '⬅ And3Way

'POS function = Product Of Sums;
```