# CMake+Nix Build Assistant

A Claude Code skill that assists with building CMake-based Nix packages, understanding cmake-specific Nix attributes, and troubleshooting CMake builds in Nix.

## Overview

This skill provides comprehensive expert guidance for:
- Building CMake-based Nix packages
- Configuring CMake builds in Nix derivations
- Understanding cmake-specific Nix attributes
- Troubleshooting CMake+Nix integration issues
- Optimizing CMake builds in the Nix environment

## When to Use

The skill activates when you:
- Work with Nix packages that use CMake as their build system
- Reference cmake in nativeBuildInputs or buildInputs
- Ask about CMake-specific Nix attributes or configuration
- Experience CMake-related build failures in Nix
- Want to package a CMake project for Nix
- Need to understand how Nix's cmake setup-hook works
- Work with derivations using stdenv.mkDerivation with cmake

## Features

### CMake Package Building
- Create derivations using stdenv.mkDerivation with cmake
- Configure nativeBuildInputs with cmake and cmake.configurePhaseHook
- Apply CMake-specific Nix attributes appropriately
- Handle CMake build directories and out-of-tree builds
- Work with CMake install targets and multiple outputs

### CMake Configuration
- Use cmakeFlags and cmakeFlagsArray to pass options to CMake
- Configure cmakeDir for subdirectory CMakeLists.txt
- Set cmakeBuildType appropriately (defaults to Release)
- Handle multiple outputs (.dev, .out, .lib, .doc)
- Configure installation paths using GNUInstallDirs variables

### Troubleshooting
- Debug CMake configuration failures
- Fix CMake find_package() issues in Nix
- Resolve NIXPKGS_CMAKE_PREFIX_PATH problems
- Handle install directory mismatches
- Debug test failures (CTest integration)

### Build Optimization
- Enable parallel builds (automatic with cmake)
- Configure parallel testing with enableParallelChecking
- Use Ninja generator for faster builds
- Leverage binary caches for CMake-based packages

## Key Nix Attributes

The skill provides detailed documentation for all Nix attributes that influence CMake builds:

### Build Directory Configuration
- `cmake.configurePhaseHook` - Enable CMake in configure phase
- `cmakeBuildDir` - Out-of-tree build directory
- `cmakeDir` - Location of CMakeLists.txt
- `dontUseCmakeBuildDir` - Build in source directory

### CMake Flags and Options
- `cmakeFlags` - Additional flags passed to cmake
- `cmakeFlagsArray` - Array of additional flags
- `cmakeBuildType` - Build type (Release, Debug, etc.)

### Testing Configuration
- `doCheck` - Enable/disable tests
- `enableParallelChecking` - Parallel CTest execution

### Installation Configuration
- `dontAddPrefix` - Skip CMAKE_INSTALL_PREFIX
- `shareDocName` - Documentation directory name

## Example Usage

### Basic CMake Package

```nix
stdenv.mkDerivation {
  pname = "mypackage";
  version = "1.0.0";
  src = fetchurl { /* ... */ };

  nativeBuildInputs = [
    cmake
    cmake.configurePhaseHook
  ];
  buildInputs = [ /* runtime dependencies */ ];
}
```

### CMake with Custom Flags

```nix
stdenv.mkDerivation {
  pname = "mypackage";
  version = "1.0.0";
  src = fetchurl { /* ... */ };

  nativeBuildInputs = [
    cmake
    cmake.configurePhaseHook
  ];

  cmakeFlags = [
    "-DENABLE_TESTS=OFF"
    "-DBUILD_SHARED_LIBS=ON"
    "-DCUSTOM_INSTALL_DIR=${placeholder "out"}/custom"
  ];
}
```

### CMake with Subdirectory

```nix
stdenv.mkDerivation {
  pname = "xxHash";
  version = "0.8.3";

  nativeBuildInputs = [
    cmake
    cmake.configurePhaseHook
  ];

  # CMakeLists.txt is in cmake_unofficial/ subdirectory
  cmakeDir = "../cmake_unofficial";
}
```

### CMake with Tests

```nix
stdenv.mkDerivation {
  pname = "mypackage";
  version = "1.0.0";
  src = fetchurl { /* ... */ };

  nativeBuildInputs = [
    cmake
    cmake.configurePhaseHook
  ];

  doCheck = true;
  checkInputs = [ /* test dependencies */ ];
}
```

## Requirements

- **Required**: Nix package manager, CMake
- **Optional**: Ninja, git, jq
- **Platforms**: Linux, macOS

## Installation

### As part of ekala-claude-skills plugin

This skill is included in the ekala-claude-skills plugin. Install the plugin:

```bash
claude-code plugins install /path/to/ekala-claude-skills
```

### Standalone

Copy this directory to your project's `.claude/skills/` directory:

```bash
cp -r skills/development/ekala-cmake-nix /path/to/your/project/.claude/skills/
```

## Documentation Highlights

The skill includes comprehensive documentation on:

- All Nix attributes that influence CMake builds
- CMake variables automatically configured by Nix
- Common build patterns and examples
- Troubleshooting guidelines for common issues
- Best practices for CMake+Nix integration
- Debugging tips and techniques
- Integration with other Nix features

## License

MIT
