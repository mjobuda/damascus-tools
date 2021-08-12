while inotifywait -e modify .; do
  cd ../hardhat-feXX && npm run build && cd ../hhtest && npx hardhat clean && npx hardhat compile
done
