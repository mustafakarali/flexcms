<h2><?=$titulo; ?><a class="cerrar" href="#" >cancelar</a></h2>
<div class="contenido_col">

<?php

$attributes = array('class' => 'form');
echo form_open('admin/idioma/' . $link, $attributes);

$idiomas = array(
    'arabic',
    'catalan',
    'croatian',
    'czech',
    'danish',
    'dutch',
    'english',
    'estonian',
    'finnish',
    'french',
    'german',
    'greek',
    'indonesian',
    'italian',
    'japanese',
    'lithuanian',
    'norwegian',
    'pirate',
    'polish',
    'portuguese',
    'russian',
    'slovak',
    'spanish',
    'swedish',
    'turkish',
    'ukrainian'
);

?>

    <div class="field">
        <div class="header">General</div>
        <div class="content">
            <div class="input">
                <label for="name" class="required">Idioma</label>
                <select id="name" name="name" class="name">
                    <? foreach ($idiomas as $key => $idioma): ?>
                        <? if ($lang->name == $idioma): ?>
                        <option selected="selected" value="<?=$idioma?>"><?=$idioma?></option>
                        <? else: ?>
                        <option value="<?=$idioma?>"><?=$idioma?></option>
                        <? endif ?>
                    <? endforeach ?>
                </select>
            </div>
            <div class="input">
                <label for="id" class="required">Diminutivo</label>
                <input id="id" type="text" class="required" name="id" value="<?= $lang->id; ?>" />
            </div>
        </div>
    </div>

    <input id="idiomaDiminutivoAnterior" type="hidden" name="idiomaDiminutivoAnterior" value="<?= $lang->id; ?>" />

<?= form_close(); ?>
</div>
<a href="<?= $link; ?>" data-level="nivel2" data-edit-url="<?= $url_edit ?>" data-delete-url="<?= $url_delete ?>" class="guardar boton importante n1 <?=$nuevo?> no_sort" ><?=$txt_boton;?></a>