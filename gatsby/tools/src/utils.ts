import fs from 'fs';
import path from 'path';
import matter, { GrayMatterFile } from 'gray-matter';

export const files = (() => {
  const _interface = {
    readFile: (filepath: string): Promise<File> => {
      return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err: any, file: any) => {
          if (err) {
            reject(err) 
          } else {
            resolve(file);
          }
        });
      })
    },
    getFilenamesByDirectory: (directory: string): Promise<string[]> => {
      return new Promise((resolve, reject) => {
        fs.readdir(directory, (err: any, files: string[]) => {
          if (err) {
            reject(err) 
          } else {
            resolve(files);
          }
        });
      })
    },
    writeFile: async (filepath: string, contents: string, forceOverride?: boolean): Promise<boolean> => {
      // If file with given path already exists we don't want to override it - that allows us to change them using the CMS
      const exists = await forceOverride ? false : _interface.checkFileExists(filepath);

      return new Promise((resolve, reject) => {
        if (exists) {
          resolve(true);

          return;
        }

        fs.writeFile(filepath, contents, (err: any) => {
          if (err) {
            reject(err) 
          } else {
            resolve(true);
          }
        });
      });
    },
    ensureDirectory: (directory: string) => {
      if (!fs.existsSync(directory)){
          fs.mkdirSync(directory);
      }
    },
    checkFileExists: (filepath: string) => {
      return new Promise((resolve, reject) => {
        fs.access(filepath, (err: any) => {
          if (err) {
            resolve(false);
          } else {
            resolve(true);
          }
        })
      });
    },
    createSafeFilename: (filename: string) => {
      return filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    }
  }

  return _interface;
})();

export const markdown = (() => {
  const _interface = {
    write: (directory: string, getFileName: (item: any) => string, getMarkdownBody?: (item: any) => string) => (items: any[]) => {
      console.log(items)

      return Promise.all(items.map(item => {
        return files.writeFile(path.resolve(directory, getFileName(item)), matter.stringify(getMarkdownBody ? getMarkdownBody(item) : '', item), true);
      }));
    }
  }

  return _interface;
})();
