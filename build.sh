#!/bin/bash

rm -rf public
mkdir public

cp -r static/* public
rm -rf public/ioi-yyyy

for y in 2017 2019 2020 2021 2022 2023; do
  d=ioi-$y

  echo "building $d..."

  mkdir public/$d
  cp -r static/ioi-yyyy/* public/$d/
  cp -r $d/* public/$d/

  sed -i s/%IOI-YEAR-e9ea67264dbf2995366f53af646bb20727e41a8b4be912cad2fcd3da24f79a77%/$y/ public/$d/index.html

  if [ -f public/$d/patch.sh ]; then
    ( cd public/$d && ./patch.sh )
  fi
done

echo "finished building"
