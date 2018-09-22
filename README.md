# Tide -> Crunch

This script parses a [tide.co](https://www.tide.co/) statement and parses it in readily uploadable .csv for [Crunch](https://www.crunch.co.uk/).

It also works around a nasty bug with Tide statements where the dates are wrong due to the timezone.

## Usage

### Build sources

    npm run build
    
### RUn compiled script

    node dist/index.js <source.csv> <generated.csv>
    
The output path is optional. By default, the file will be outputted in the current directory.
