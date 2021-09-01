while inotifywait -r -e modify .; do
  cd hardhat-fe ; npm install && npm run build && cd ../hhtest && npx hardhat clean && npx hardhat compile ; cd ..
done
