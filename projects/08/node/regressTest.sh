nobootstrap=(
MemoryAccess/BasicTest
MemoryAccess/PointerTest
MemoryAccess/StaticTest
StackArithmetic/SimpleAdd
StackArithmetic/StackTest
ProgramFlow/BasicLoop
ProgramFlow/FibonacciSeries
FunctionCalls/SimpleFunction
)

bootstrap=(
FunctionCalls/FibonacciElement
FunctionCalls/NestedCall
FunctionCalls/StaticsTest
)

for dir in ${nobootstrap[@]}
do
  node --experimental-modules trans.mjs $dir nobootstrap
  if [ $? != 0 ]
  then
    echo 'TRANSLATION DID NOT FINISH'
    break
  fi
done

for dir in ${bootstrap[@]}
do
  node --experimental-modules trans.mjs $dir
  if [ $? != 0 ]
  then
    echo 'TRANSLATION DID NOT FINISH'
    break
  fi
done
