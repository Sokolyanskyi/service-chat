const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Настройка resolver для поддержки SVG
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts.push("svg");

// Возвращаем конфигурацию с NativeWind и SVG
module.exports = withNativeWind(config, { input: "./global.css" });
