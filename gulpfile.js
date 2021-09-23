const { readFileSync, createReadStream, createWriteStream, writeFile, rename } = require('fs')
const gulp = require('gulp')
const { parse, join, basename } = require('path')
const { default: axios } = require('axios')
const del = require('del')
const execa = require('execa')

/**
 * React asset-manifest
 * @typedef {Object} AssetManifest
 * @property {{ [key: string]: string }} files
 * @property {Array<String>} entrypoints
 */

/**
 * External library
 * @typedef {Object} Requirement
 * @property {String} name
 * @property {String} url
 * @property {String} hash
 */

// Load env
const result = require('dotenv').config()
if (typeof result.error !== 'undefined') {
  throw result.error
}

// Paths ---

const cwd = process.cwd()
const root = parse(cwd).root

/** Source directory */
const input = join(cwd, './src')

/** Output directory */
const output = join(cwd, './build')

/** Libraries directory */
const lib = join(cwd, './lib')

/** Auto-Hotkey interpreter *(Set with the AUTOHOTKEY environment variable)* */
const ahk = join(process.env.AUTOHOTKEY, 'AutoHotkey.exe')

/** Auto-Hotkey compiler *(Set with the AHK2EXE environment variable)* */
const ahk2exe = join(process.env.AUTOHOTKEY, 'Compiler/Ahk2Exe.exe')

/** Inno-Setup compiler *(Set with the ISCC environment variable)* */
const iscc = process.env.ISCC

/** React-scripts cli */
const reactScripts = require.resolve('react-scripts/bin/react-scripts')

// Functions ---

/**
 * Check if a file exists
 * @param {String} path
 * @returns {Promise<Boolean>}
 */
const exists = async (path) => {
  const fs = require('fs')
  return await new Promise((resolve, reject) => {
    fs.access(path, fs.F_OK, (error) => {
      if (error) {
        resolve(false)
      }
      resolve(true)
    })
  })
}

/**
 * Download file
 * @param {String} url
 * @param {String} cwd
 * @returns {Promise<String>}
 */
const download = async (url, cwd) => {
  const res = await axios.get(url, { responseType: 'stream' })

  /**
   * Get filename from content-disposition header
   * @param {String} contentDisposition
   * @returns {String}
   */
  const getFilenameFromContentDisposition = (contentDisposition) => /filename=([^;]+)/.exec(contentDisposition).pop()

  /**
   * Fallback get filename from url
   * @param {String} url
   * @returns {String}
   */
  const getFilenameFromURL = (url) => basename(url)

  return await new Promise((resolve, reject) => {
    const filename = typeof res.headers['content-disposition'] === 'string'
      ? getFilenameFromContentDisposition(res.headers['content-disposition'])
      : getFilenameFromURL(url)
    const stream = createWriteStream(join(cwd, filename))
    let error

    stream
      .on('error', (err) => {
        error = err
        stream.close()
        reject(err)
      })
      .on('close', () => {
        if (typeof error === 'undefined') {
          resolve(filename)
        } else {
          reject(error)
        }
      })
    res.data.pipe(stream)
  })
}

// Tasks ---

gulp.task('kill', () => execa(ahk, ['./scripts/KillScripts.ahk']))
gulp.task('run', (cb) => {
  const child = execa(ahk, ['Aberoth.ahk'], { cwd: output, cleanup: false, detached: true, stdio: 'ignore' })
  child.unref()
  cb()
})

gulp.task('clean:build', () => {
  return del('./build', { force: true })
})
gulp.task('clean:lib', () => {
  return del('./lib', { force: true })
})
gulp.task('clean:logs', () => {
  return del('./logs', { force: true })
})
gulp.task('clean:bak', () => {
  return del('**/*.bak', { cwd: input })
})

gulp.task('copy', () => {
  return gulp
    .src(['./config/*'], { cwd: input, cwdbase: true })
    .pipe(gulp.dest(output))
})
gulp.task('copy:ahk', () => {
  return gulp
    .src(['./*.ahk'], { cwd: input, cwdbase: true })
    .pipe(gulp.dest(output))
})
gulp.task('copy:lib', () => {
  return gulp
    .src('./lib/**/*', { cwd, cwdbase: true })
    .pipe(gulp.dest(output))
})

gulp.task('write:fileinstall', (cb) => {
  /**
   * asset manifest json
   * @type {AssetManifest}
   */
  const assetManifest = JSON.parse(readFileSync('./build/asset-manifest.json', 'utf-8'))

  /** Assets template */
  const template = Object
    .values(assetManifest.files)
    .filter((file) => !file.includes('.map') && !file.includes('LICENSE'))
    .map((file) => `;@Ahk2Exe-AddResource *10 ${file.replace(/\//g, '\\')}`)
    .join('\r\n')

  writeFile(
    join(output, 'FileInstall.ahk'),
    `;@Ahk2Exe-AddResource *10 .\\favicon.ico
${template}`,
    'utf-8',
    cb
  )
})
gulp.task('write:meta', (cb) => {
  const child = execa.sync('git rev-parse HEAD')
  writeFile(
    join(output, 'meta.ini'),
    `build_commit="${child.stdout}"
build_version="${'0.1.0'}"
build_date="${new Date()}"
homepage="https://github.com/ashnel3/aberoth-hotkeys"
issues="https://github.com/ashnel3/aberoth-hotkeys/issues"
donations=""
    `,
    cb
  )
})

gulp.task('build:ahk', () => {
  return execa(
    ahk2exe,
    [
      '/in', 'Aberoth.ahk',
      '/out', 'aberoth-hotkeys.exe',
      '/icon', 'favicon.ico'
    ],
    { cwd: output }
  )
})
gulp.task('build:react', async () => {
  const child = execa(reactScripts, ['build'])
  child.stdout.pipe(process.stdout)
  await child
})
gulp.task('build:inno', (cb) => {
  if (typeof iscc !== 'undefined') {
    // TODO: Inno-Setup installer
    cb()
  }
})

gulp.task('eslint', () => {
  const eslint = require('@doamatto/gulp-eslint')
  return gulp
    .src(['src/**/*.{js,ts,tsx}', 'scripts/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})
gulp.task('stylelint', () => {
  const stylelint = require('gulp-stylelint')
  return gulp
    .src(['./**/*.{css,scss}'], { cwd: input })
    .pipe(stylelint({
      reporters: [ { formatter: 'string', console: true } ],
      failAfterError: true
    }))
})

gulp.task('yunit', (cb) => {
  // TODO: Yunit tests
  cb()
})
gulp.task('jest', () => execa(
  reactScripts,
  ['test'],
  { env: { CI: true } }
))

// Entry-points

gulp.task('clean', gulp.parallel('kill', 'clean:build', 'clean:logs', 'clean:bak'))

gulp.task('build', gulp.series('kill', 'build:react', gulp.parallel('copy', 'copy:ahk', 'copy:lib', 'write:meta', 'write:fileinstall'), 'build:ahk', 'build:inno'))
gulp.task('build:dev', gulp.series('kill', 'build:react', gulp.parallel('copy', 'copy:ahk' , 'copy:lib', 'write:meta', 'write:fileinstall')))

gulp.task('lint', gulp.series('eslint', 'stylelint'))
gulp.task('test', gulp.series('yunit', 'jest'))
gulp.task('ci', gulp.series('lint', 'test', 'kill'))

gulp.task('start', gulp.series('build', 'run'))
gulp.task('start:dev', () => {
  gulp.watch(
    ['**/*', '!**/*.{bak,iss,test.tsx,test.ahk}'],
    { cwd: input, ignoreInitial: false },
    gulp.series('build:dev', 'run')
  )
})
gulp.task('start:test', () => {
  gulp.watch(
    ['test/*.test.tsx', 'test/*.test.ahk'],
    { cwd: input, ignoreInitial: false },
    gulp.series('test')
  )
})

gulp.task('install', async () => {
  const { createHash } = require('crypto')
  const mkdirp = require('mkdirp')
  const tar = require('tar')

  /**
   * External requirements
   * @type {Array<Requirement>}
   */
  const requirements = JSON.parse(readFileSync('requirements.json', 'utf-8'))


  /**
   * Checksum a file
   * @param {String} path File path
   * @param {String} hash Sha256 hash
   */
  const checksum = async (path, hash) => {
    return await new Promise((resolve, reject) => {
      const shasum = createHash('sha256')
      const stream = createReadStream(path)
      let error

      stream
        .on('error', (err) => {
          error = err
          stream.close()
          reject(err)
        })
        .on('close', () => {
          if (!error) {
            resolve(hash === shasum.digest('hex'))
          } else {
            reject(error)
          }
        })
        .on('data', (data) => {
          shasum.update(data)
        })
    })
  }

  console.log('Installing external requirements...')
  await mkdirp(lib)

  for (const req of requirements) {
    if (typeof req !== 'object') continue
    const { hash, name, url } = req

    if ((await exists(join(lib, name)) === true)) {
      console.log(`  - found: ${name}`)
      continue
    } else {
      console.log(`  - downloading: ${name}`)
    }

    await download(url, lib)
      .then(async (filename) => {
        const file = join(lib, filename)

        // Checksum & extract
        if (await checksum(file, hash)) {
          console.log('    matched checksum')
          await tar.extract({
            cwd: lib,
            file
          })
          return filename
        } else {
          throw new Error(`"${file}" failed checksum!`)
        }
      })
      .then(async (filename) => {
        return await new Promise((resolve, reject) => {
          /** Extracted directory */
          const archiveDir = filename.replace(/\.(tar\.)?([^.]+)$/, '')
          rename(join(lib, archiveDir), join(lib, name), (error) => {
            if (error ) {
              reject(error)
            }
            resolve()
          })
        })
      })
      .then(() => console.log('    installed!'))
      .then(async () => await del('**/*.{tar,tar.gz}', { cwd: lib }))
      .catch((error) => {
        console.log('Failed to install requirements!')
        throw error.message
      })
  }
})
