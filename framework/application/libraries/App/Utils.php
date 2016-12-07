<?php
/**
 * Created by PhpStorm.
 * User: Miguel
 * Date: 06-Dec-16
 * Time: 04:15 PM
 */

namespace App;


class Utils
{

    /**
     * Get the folder names in the provided path
     * 
     * @param $path
     * @return array
     */
    public static function getFolders($path)
    {
        $folders = [];
        foreach (new \DirectoryIterator($path) as $file) {
            if ($file->isDot()) continue;
            if ($file->isDir()) {
                $folders[] = $file->getFilename();
            }
        }

        return $folders;
    }

}