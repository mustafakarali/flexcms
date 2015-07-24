<h2><?=$titulo; ?><a class="cerrar" href="#" data-delete="<?=$removeUrl?>" >cancelar</a></h2>
<div class="contenido_col">

<?php

$attributes = array('class' => 'form');
echo form_open('admin/descargas/' . $link, $attributes);

?>

<div class="field">
	<div class="header">General</div>
	<div class="content">
		
		<fieldset>
			<legend>Nombre</legend>
			<? foreach ($idiomas as $key => $idioma): ?>
			<div>
				<label for="<?=$idioma['idiomaDiminutivo']?>_descargaNombre"><?=$idioma['idiomaNombre']?></label>
				<? if(count($traducciones[$idioma['idiomaDiminutivo']]) > 0):?>
					<input class="required name" name="<?=$idioma['idiomaDiminutivo']?>_descargaNombre" type="text" value="<?=$traducciones[$idioma['idiomaDiminutivo']]->descargaNombre?>"/>
				<? else: ?>
					<input class="required name" name="<?=$idioma['idiomaDiminutivo']?>_descargaNombre" type="text" value=""/>
				<? endif ?>
			</div>
			<? endforeach ?>
		</fieldset>

		<div class="input">
			<label for="descargaFecha">Fecha:</label>
			<input id="descargaFecha" class="fecha" name="descargaFecha" type="text" value="<?=$descargaFecha?>"/>
		</div>
		
		<div class="input">
			<label for="descargaCategoriaId">Categoría</label>
			<select class="selectbox" id="descargaCategoriaId" name="descargaCategoriaId">
				<?= admin_select_tree($categorias, $descargaCategoriaId, 'descargaCategoriaNombre') ?>
			</select>
		</div>

        <fieldset id="upload-file">
            <legend><?=$txt_botImagen;?></legend>
            <div>
                <input class="fileselect" type="file" name="fileselect[]" />
                <div class="filedrag">o arrastre el archivo aquí</div>
            </div>
            <ul class="list">
                <? if($archivoUrl != ''): ?>
                    <li class="default">
                        <?=$archivoUrl?>
                    </li>
                <? endif; ?>
            </ul>
        </fieldset>
		
		<div class="input">
			<input type="checkbox" name="descargaEnabled" id="descargaEnabled" <?= $descargaEnabled; ?> />
			<label for="descargaEnabled">Publicado</label>
		</div>
	</div>
</div>

    <input id="upload-fileName" type="hidden" name="fileName" value="<?=$descargaArchivo;?>" data-orig="<?=$imagenOrig?>" />
    <input id="descargaId" type="hidden" name="descargaId" value="<?=$descargaId;?>" />

<?= form_close(); ?>
</div>
<a href="<?= $link; ?>" data-level="nivel2" data-edit-url="gallery/file/edit/<?=$descargaId?>" data-delete-url="gallery/file/delete/<?=$descargaId?>" class="guardar boton importante n1 selectbox <?=$nuevo?>" ><?=$txt_boton;?></a>

<script type="text/javascript">
	initDatePicker();
    upload.file('upload-file', 'upload-fileName', '<?=base_url();?>admin/archivo/galeria/<?=$descargaCategoriaId?>/<?=$descargaId?>', true);
</script>