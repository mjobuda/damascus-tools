package main

import (
	"fmt"
	"github.com/kbinani/screenshot"
	"github.com/kolesa-team/go-webp/encoder"
	"github.com/kolesa-team/go-webp/webp"
	"image"
	"image/png"
	"os"
	"time"
  "strconv"
)

// save *image.RGBA to filePath with PNG format.
func save(img *image.RGBA, filePath string) {
	file, err := os.Create(filePath)
	if err != nil {
		print(err)
	}
	defer file.Close()
	png.Encode(file, img)
}

// save *image.RGBA to filePath with webP format.
func saveWP(img *image.RGBA, filePath string) {
  output, err :=
  os.Create(filePath)
  if err != nil {
    print(err)
  }
  defer output.Close()
	options, err := encoder.NewLosslessEncoderOptions(encoder.PresetDefault, 6)
  if err != nil {
    print(err)
  }
	err = webp.Encode(output, img, options) 
  if err != nil {
    print(err)
  }
}
func main() {
	// Capture each displays.
  os.Mkdir("zrzuty", os.ModePerm);
	n := screenshot.NumActiveDisplays()
	if n <= 0 {
		print("Active display not found")
	}

	var all image.Rectangle = image.Rect(0, 0, 0, 0)

	for i := 0; i < n; i++ {
		bounds := screenshot.GetDisplayBounds(i)
		all = bounds.Union(all)
	}
	for true {
		time.Sleep(100 * time.Millisecond)
		// Capture all desktop region into an image.
		fmt.Printf("%v\n", all)
		img, err := screenshot.Capture(all.Min.X, all.Min.Y, all.Dx(), all.Dy())
		if err != nil {
			print(err)
		}
		saveWP(img, "zrzuty/"+ strconv.FormatInt(time.Now().UnixNano(),10) +".webp")
	}

}
