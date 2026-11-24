<?php defined('C5_EXECUTE') or die('Access Denied.');
/**
 * @var array|null                                $formContent
 * @var \Concrete\Core\View\View                  $view
 * @var \Concrete\Core\Form\Service\Form          $form
 * @var \Concrete\Core\Validation\CSRF\Token|null $token
 * @var \CareersManager\Entity\Location|null      $entity
 */
?>

<?php if ($entity) { ?>
    <div class="ccm-dashboard-header-buttons">
        <button data-launch-dialog="delete-location" class="btn btn-danger"><?php echo t('Delete'); ?></button>
    </div>

    <div style="display: none" data-dialog="delete-location" class="ccm-ui">
        <form data-dialog-form="delete-location-form" method="POST" action="<?php echo $view->action('delete', $entity->getID()); ?>">
            <?php $token->output('delete-location-' . $entity->getID()); ?>
            <p><?php echo t('Are you sure you want to permanently delete "%s"?', h($entity->getName())); ?></p>
            <p><strong><?php echo t('This cannot be undone.'); ?></strong></p>
        </form>
        <div class="dialog-buttons">
            <button class="btn btn-secondary float-start" data-dialog-action="cancel"><?php echo t('Cancel'); ?></button>
            <button class="btn btn-danger float-end" data-dialog-action="submit"><?php echo t('Delete'); ?></button>
        </div>
    </div>

    <script>
        $(function() {
            $('[data-launch-dialog="delete-location"]').on('click', function(e) {
                e.preventDefault();
                jQuery.fn.dialog.open({
                    element: $('div[data-dialog="delete-location"]'),
                    modal: true,
                    width: 420,
                    title: <?php echo json_encode(t('Delete Location')); ?>,
                    height: 'auto'
                });
            });
            ConcreteEvent.subscribe('AjaxFormSubmitSuccess', function(e, data) {
                if (data.form === 'delete-location-form') {
                    window.location.href = <?php echo json_encode((string) \URL::to('/dashboard/careers_manager/locations')); ?>;
                }
            });
        });
    </script>
<?php } ?>

<component-location-form>
    <form method="post" action="<?php echo $view->action('save'); ?>">
        <?php echo $token->output('submit') ?>
        <?php echo ($entity || ($formContent && $formContent['id'])) ? $form->hidden('id', ($formContent) ? $formContent['id'] : $entity->getID()) : ''; ?>

        <fieldset>
            <legend><?php echo t('Details'); ?></legend>

            <div class="form-group">
                <?php echo $form->label('name', t('Name')); ?>
                <div class="input-group">
                    <?php echo $form->text('name', (($formContent) ? $formContent['name'] : (($entity) ? $entity->getName() : false))); ?>
                    <span class="input-group-text"><i class="fas fa-asterisk"></i></span>
                </div>
            </div>

            <div class="form-group">
                <?php echo $form->label('handle', t('Handle')); ?>
                <div class="input-group">
                    <?php echo $form->text('handle', (($entity) ? $entity->getHandle() : (($formContent) ? $formContent['handle'] : false)), ($entity ? [ 'readonly' => 'readonly', 'class' => 'disabled' ] : [])); ?>
                    <span class="input-group-text"><i class="fas fa-asterisk"></i></span>
                </div>

                <div class="feedback-container"></div>
            </div>


            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="1" id="isPrimary" name="isPrimary" <?php echo ($formContent) ? $formContent['isPrimary'] : (($entity && $entity->getIsPrimary() === true) ? 'checked' : ''); ?> />
                    <label class="form-check-label" for="isPrimary">
                        <?php echo t('Make Primary Location'); ?>
                    </label>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <legend><?php echo t('Address & Location'); ?></legend>

            <div class="form-group">
                <?php echo $form->label('address', t('Address')); ?>
                <div class="input-group">
                    <?php echo $form->textarea('address', (($formContent) ? $formContent['address'] : (($entity) ? $entity->getAddress() : false)), [ 'rows' => 5 ]); ?>
                    <span class="input-group-text"><i class="fas fa-asterisk"></i></span>
                </div>
            </div>

            <div class="row">
                <div class="col-12 col-lg-6">
                    <div class="form-group">
                        <?php echo $form->label('latitude', t('Latitude')); ?>
                        <?php echo $form->text('latitude', (($formContent) ? $formContent['latitude'] : (($entity) ? $entity->getLatitude() : false)), [ 'readonly' => 'readonly' ]); ?>
                    </div>
                </div>

                <div class="col-12 col-lg-6">
                    <div class="form-group">
                        <?php echo $form->label('longitude', t('Longitude')); ?>
                        <?php echo $form->text('longitude', (($formContent) ? $formContent['longitude'] : (($entity) ? $entity->getLongitude() : false)), [ 'readonly' => 'readonly' ]); ?>
                    </div>
                </div>
            </div>
        </fieldset>

        <div class="ccm-dashboard-form-actions-wrapper">
            <div class="ccm-dashboard-form-actions">
                <a href="<?php echo $view->action(''); ?>" class="btn btn-secondary float-start"><?php echo t('Cancel'); ?></a>
                <?php echo $form->submit('save', ($entity) ? t('Update') : t('Save'), ['class' => 'btn btn-primary float-end']); ?>
            </div>
        </div>
    </form>
</component-location-form>
