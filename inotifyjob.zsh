while inotifywait -r -e modify .; do
  cd hardhat-fe ; npm run build && cd ../hhtest && npx hardhat clean && npx hardhat compile ; cd ..
done
