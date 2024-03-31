#!/bin/bash

rm -rf public
mkdir public

cp -r static/* public
rm -rf public/ioi-yyyy

for d in ioi-2017 ioi-2019 ioi-2020 ioi-2021 ioi-2022 ioi-2023; do
  echo "building $d..."

  mkdir public/$d
  cp -r static/ioi-yyyy/* public/$d/
  cp -r $d/* public/$d/

  if [ -f public/$d/patch.sh ]; then
    ( cd public/$d && ./patch.sh )
  fi
done

echo "finished building"
