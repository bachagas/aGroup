#!/bin/bash

#Color definitions
green='\033[0;32m' #Green
red='\033[0;31m' #Red
yellow='\033[1;33m' #Yellow
NC='\033[0m' #No Color

echo "Finding javascript files in project..."
arqs=$(find ./ -name "*.js" | grep -v bower_components | grep -v node_modules | grep -v 'test/')
#echo $arqs
#for arq in $arqs; do echo $arq; eslint $arq; done;
echo "Linting project files..."
eslint $arqs

result=$?
if [[ $result != 0 ]] ; then
  echo -e "${red}--> ESLint check failed, check messages above"
  exit $result
fi
echo "Done!"
echo
echo -e "${green}--> Well done! Everything seems ok with your code! ;-)"
echo
