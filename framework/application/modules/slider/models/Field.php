<?php
/**
 * Created by PhpStorm.
 * User: miguel
 * Date: 12/8/15
 * Time: 2:49 PM
 */

namespace Slider\Models;

use App\Language;
use App\Translation;

class Field extends \App\Field {

    public function setTranslations($input)
    {
        foreach(Language::all() as $lang){

            $trans_data = [
                'label' => $input['label'][$lang->id],
            ];

            $trans = Translation::firstOrNew([
                'language_id' => $lang->id,
                'parent_id' => $this->id,
                'type' => 'slider_field'
            ]);
            $trans->data = json_encode($trans_data);
            $trans->save();

        }
    }

}