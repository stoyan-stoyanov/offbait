#!/bin/bash

# Output file
OUTPUT_FILE="README-AI.md"

# Clear or create the output file
echo "# Repository Documentation" > "$OUTPUT_FILE"
echo -e "\nThis documentation was automatically generated.\n" >> "$OUTPUT_FILE"

# First process README files
find . -type f \
    -name "README.md" \
    ! -name "README-AI.md" \
    -print0 | while IFS= read -r -d $'\0' file; do
    echo -e "\n## $file\n" >> "$OUTPUT_FILE"
    echo -e "\`\`\`" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo -e "\`\`\`\n" >> "$OUTPUT_FILE"
done

# Then process all other files
find . -type f \
    ! -path "*/\.*" \
    ! -name ".DS_Store" \
    ! -path "*/node_modules/*" \
    ! -path "*/__pycache__/*" \
    ! -path "*/venv/*" \
    ! -path "*/dist/*" \
    ! -path "*/build/*" \
    ! -name "README*.md" \
    ! -name "generate-docs.sh" \
    ! -name "*.jpg" \
    ! -name "*.jpeg" \
    ! -name "*.png" \
    ! -name "*.gif" \
    ! -name "*.svg" \
    ! -name "*.ico" \
    ! -name "*.webp" \
    ! -name ".env*" \
    ! -name "*.env" \
    ! -name "*.key" \
    ! -name "*.pem" \
    ! -name "*.crt" \
    ! -name "*.csr" \
    ! -name "*.p12" \
    ! -name "*.pfx" \
    ! -name "*secret*" \
    ! -name "*password*" \
    ! -name "*credential*" \
    ! -name "*.log" \
    ! -name "*.lock" \
    ! -name "yarn.lock" \
    ! -name "package-lock.json" \
    ! -name "pnpm-lock.yaml" \
    ! -name "poetry.lock" \
    ! -path "*/vendor/*" \
    ! -path "*/.terraform/*" \
    -print0 | while IFS= read -r -d $'\0' file; do
    echo -e "\n## $file\n" >> "$OUTPUT_FILE"
    echo -e "\`\`\`" >> "$OUTPUT_FILE"
    cat "$file" >> "$OUTPUT_FILE"
    echo -e "\`\`\`\n" >> "$OUTPUT_FILE"
done

echo "Documentation generated in $OUTPUT_FILE"