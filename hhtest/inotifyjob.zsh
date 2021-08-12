while inotifywait -e modify .; do
  cd ../hardhat-fe && npm buildu && cd ../hhtest && npx hardhat clean && npx hardhat compile
done
