while inotifywait -e modify .; do
  node rr.js
done
