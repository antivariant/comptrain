#!/bin/bash

# 🔧 Настроить нужную платформу: web / apk / ios / macos
TARGET=${1:-web}

BASE_URL=https://api-dljnuufljq-uc.a.run.app

echo "📦 Building Flutter app for $TARGET..."
echo "🌍 Using API_BASE_URL = $BASE_URL"

case $TARGET in
  web)
    flutter build web --dart-define=API_BASE_URL=$BASE_URL
    ;;
  apk)
    flutter build apk --dart-define=API_BASE_URL=$BASE_URL
    ;;
  ios)
    flutter build ios --dart-define=API_BASE_URL=$BASE_URL
    ;;
  macos)
    flutter build macos --dart-define=API_BASE_URL=$BASE_URL
    ;;
  *)
    echo "❌ Unknown target: $TARGET"
    echo "Usage: ./buildprod.sh [web|apk|ios|macos]"
    exit 1
    ;;
esac

echo "✅ Build complete!"
