#!/bin/bash

# Output file
OUTPUT_FILE="README-AI.md"

# Clear or create the output file
echo "# Repository Documentation" > "$OUTPUT_FILE"
echo -e "\nThis documentation was automatically generated.\n" >> "$OUTPUT_FILE"

# Find all files recursively, excluding unnecessary files and images
find . -type f \
    ! -path "*/\.*" \
    ! -name ".DS_Store" \
    ! -path "*/node_modules/*" \
    ! -path "*/__pycache__/*" \
    ! -path "*/venv/*" \
    ! -path "*/dist/*" \
    ! -path "*/build/*" \
    ! -name "README-AI.md" \
    ! -name "*.jpg" \
    ! -name "*.jpeg" \
    ! -name "*.png" \
    ! -name "*.gif" \
    ! -name "*.svg" \
    ! -name "*.ico" \
    ! -name "*.webp" \
    -print0 | while IFS= read -r -d $'\0' file; do
    echo -e "\n## $file\n" >> "$OUTPUT_FILE"
    echo -e "\`\`\`" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo -e "\`\`\`\n" >> "$OUTPUT_FILE"
done

echo "Documentation generated in $OUTPUT_FILE"