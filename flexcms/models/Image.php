<?php
/**
 * Created by PhpStorm.
 * User: miguel
 * Date: 11/26/15
 * Time: 4:37 PM
 */

namespace App;

use Intervention\Image\ImageManagerStatic as Intervention;

class Image extends File {

    protected $table = 'files';

    /**
     * Process the images, resize, crop, etc based on the config
     *
     * @param $file
     * @param $path
     * @param ImageConfig $config
     * @param $crop
     * @param null $origPath
     * @return \Intervention\Image\Image
     */
    public static function process($file, $path, ImageConfig $config, $crop, $origPath = NULL)
    {
        // Check if the filename is empty, this will happen if the file is not uploaded
        isset($file['file_name']) ? $file_name = $file['file_name'] : $file_name = $file['name'];

        // The extension is saves without the dot in DB, but it comes with the dot from the frontend
        $extension = str_replace('.', '', $file['file_ext']);

        if(!$origPath) {
            $origPath = $path . $file_name . '_orig.' . $extension;
        }

        $basePath = $path . $file_name . $config->sufix;
        $newPath = $basePath . '.' . $extension;

        // Open the original image file
        $img = Intervention::make($origPath);

        // If we are going to force the image to JPG, encode it as JPG
        if($config->force_jpg) {
            $newPath = $basePath . '.jpg';
            $img->encode('jpg', $config->quality);
        }

        // Crop the image
        if($config->crop) {
            $img->crop(round($crop['cropWidth']), round($crop['cropHeight']), round($crop['cropLeft']), round($crop['cropTop']));
        }

        // Resize the image
        else if($config->restrict_proportions) {
            if($config->width > $config->height) {
                $img->widen($config->width);
            } else {
                $img->heighten($config->height);
            }
        }

        // Set the watermark
        if($config->watermark) {
            $watermark = $config->watermark();
            $wImg = Intervention::make($watermark->getFilePath());
            $wImg->opacity($config->watermark_alpha);

            if($config->watermark_repeat) {
                $img->fill($wImg);
            } else {
                $img->insert($wImg, $config->watermark_position);
            }
        }

        $img->save($newPath, $config->quality);

        return $img;
    }

}
