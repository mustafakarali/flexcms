<?php
/**
 * Created by PhpStorm.
 * User: miguel
 * Date: 7/10/15
 * Time: 11:19 AM
 */

namespace Contact;
$_ns = __NAMESPACE__;

use App\Input;
use App\Translation;
use Illuminate\Database\Eloquent\Model;
use stdClass;
use Exception;

class Field extends \Field implements \AdminParentInterface {

    const FIELD_SECTION = 'contact';
    const TRANSLATION_SECTION = 'contact_field';

    const URL_CREATE = 'admin/contact/field/create/';
    const URL_UPDATE = 'admin/contact/field/update';
    const URL_DELETE = 'admin/contact/field/delete';
    const URL_INSERT = 'admin/contact/field/insert/';
    const URL_EDIT = 'admin/contact/field/edit';
    const URL_REORDER = 'admin/contact/field/reorder';

    public function edit($id)
    {
        $this->_showView(Models\Field::find($id));
    }

    public function create($parent_id = null)
    {
        $model = new Models\Field();
        $model->parent_id = $parent_id;
        $this->_showView($model, true);
    }

    public function insert($parent_id)
    {

        $response = new stdClass();
        $response->error_code = 0;

        try{
            $field = $this->_store(new Models\Field());
            $field->position = Models\Field::where('section', static::FIELD_SECTION)->count();
            $field->parent_id = $parent_id;
            $field->save();
            $response->new_id = $field->id;
        } catch (Exception $e) {
            $response = $this->error('Ocurri&oacute; un problema al crear la el campo!', $e);
        }

        $this->load->view(static::RESPONSE_VIEW, [static::RESPONSE_VAR => $response]);

    }

    public function delete($id)
    {

        //Delete any translations
        Translation::where('parent_id', $id)->where('type', static::TRANSLATION_SECTION)->delete();

        //Delete the field
        parent::delete($id);

    }

    /**
     * Shows the editor view
     *
     * @param Model $model
     * @param bool $new
     * @return mixed
     */
    public function _showView(Model $model, $new = FALSE)
    {

        $data['field'] = $model;
        $data['titulo'] = $new ? "Crear Elemento" : 'Editar Elemento';
        $data['link'] = $new ? base_url(static::URL_INSERT . $model->parent_id) : base_url(static::URL_UPDATE . '/' . $model->id);
        $data['txt_boton'] = $new ? "crear" : 'Modificar Elemento';
        $data['nuevo'] = $new ? 'nuevo' : '';
        $data['inputs'] = Input::where('section', static::FIELD_SECTION)->get();

        $data['edit_url'] = static::URL_EDIT;
        $data['delete_url'] = static::URL_DELETE;

        $data['translations'] = $model->getTranslations(static::TRANSLATION_SECTION);

        $this->load->view('contact/field_view', $data);

    }

    /**
     * Inserts or updates the current model with the provided post data
     *
     * @param Model $model
     * @return mixed
     */
    public function _store(Model $model)
    {

        $model->name = $this->input->post('name');
        $model->css_class = $this->input->post('css_class');
        $model->input_id = $this->input->post('input_id');
        $model->validation = $this->input->post('validation');
        $model->required = (bool) $this->input->post('required');
        $model->enabled = (bool) $this->input->post('enabled');
        $model->section = static::FIELD_SECTION;

        $model->save();

        //Update the content's translations
        $model = Models\Field::find($model->id);
        $model->setTranslations($this->input->post());

        return $model;

    }

}