<?php defined('C5_EXECUTE') or die('Access Denied.');
/**
 * @var array|null                                $formContent
 * @var \Concrete\Core\View\View                  $view
 * @var \Concrete\Core\Form\Service\Form          $form
 * @var \Concrete\Core\Validation\CSRF\Token|null $token
 * @var \CareersManager\Entity\Department|null    $entity
 */
?>

<?php if ($entity) { ?>
    <div class="ccm-dashboard-header-buttons">
        <button data-launch-dialog="delete-department" class="btn btn-danger"><?php echo t('Delete'); ?></button>
    </div>

    <div style="display: none" data-dialog="delete-department" class="ccm-ui">
        <form data-dialog-form="delete-department-form" method="POST" action="<?php echo $view->action('delete', $entity->getID()); ?>">
            <?php $token->output('delete-department-' . $entity->getID()); ?>
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
            $('[data-launch-dialog="delete-department"]').on('click', function(e) {
                e.preventDefault();
                jQuery.fn.dialog.open({
                    element: $('div[data-dialog="delete-department"]'),
                    modal: true,
                    width: 420,
                    title: <?php echo json_encode(t('Delete Department')); ?>,
                    height: 'auto'
                });
            });
            ConcreteEvent.subscribe('AjaxFormSubmitSuccess', function(e, data) {
                if (data.form === 'delete-department-form') {
                    window.location.href = <?php echo json_encode((string) \URL::to('/dashboard/careers_manager/departments')); ?>;
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
        </fieldset>

        <div class="ccm-dashboard-form-actions-wrapper">
            <div class="ccm-dashboard-form-actions">
                <a href="<?php echo $view->action(''); ?>" class="btn btn-secondary float-start"><?php echo t('Cancel'); ?></a>
                <?php echo $form->submit('save', ($entity) ? t('Update') : t('Save'), ['class' => 'btn btn-primary float-end']); ?>
            </div>
        </div>
    </form>
</component-location-form>
