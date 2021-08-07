for file in ./*/; do
  echo building $file
  zsh $file/build.zsh
done
