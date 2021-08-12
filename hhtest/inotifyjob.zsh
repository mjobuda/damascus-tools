while inotifywait -e modify .; do
  cdYi ../hardhat-fe && npm run build && cd ../hhtest && npx hardhat clean && npx hardhat compile
done
