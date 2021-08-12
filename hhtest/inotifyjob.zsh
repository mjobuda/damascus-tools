while inotifywait -e modify .; do
  cd ../hardhat-fe && npm build && cd ../hhtest && npx hardhat clean && npx hardhat compile
done
