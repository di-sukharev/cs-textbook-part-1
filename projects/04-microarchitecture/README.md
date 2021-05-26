# Микроархитектура компьютера

Соберите чипы:

1. [Счетчик (program counter)](counter/PC.hdl)
2. [Процессор (CPU)](CPU/CPU.hdl)
3. [Компьютер](computer/Computer.hdl)

## Счетчик (program counter)

N-битный счетчик состоит из N-битного регистра, инкрементора и комбинационной логики. Инкрементор увеличивает счетчик на +1 каждый такт. Комбинационная логика устанавливает счетчик в состояние управляемое тремя control битами.

## Процессор (CPU)

## Память (Memory)

```c
DMux4Way(in=load, sel=address[13..14], a=ram, b=rram, c=scrn, d=keybd);

Or(a=ram, b=rram, out=rr);
RAM16K(in=in, load=rr, address=address[0..13], out=r);
// 16384 -> 24575
Screen(in=in, load=scrn, address=address[0..12], out=sc);

// 24576
Keyboard(out=k);

Mux4Way16(a=r, b=r, c=sc, d=k, sel=address[13..14], out=out);
```

## Компьютер

```c
Memory(in=outM, load=writeM, address=addressM, out=inM);

CPU(inM=inM, instruction=instruction, reset=reset, outM=outM, writeM=writeM, addressM=addressM, pc=PCout);

ROM32K(address=PCout, out=instruction);
```
