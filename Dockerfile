# Use the official n8n image
FROM n8nio/n8n:latest

# Increase memory limit to avoid build crashes
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Expose default n8n port
EXPOSE 5678

# Start n8n
CMD ["n8n"]
