for file in ./*/; do
  echo building $file
  zsh $file/release.zsh
done
