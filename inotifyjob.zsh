while inotifywait -e modify hhtest; do
  cd hardhat-fe && npm run build && cd ../hhtest && npx hardhat clean && npx hardhat compile && cd ..
done
