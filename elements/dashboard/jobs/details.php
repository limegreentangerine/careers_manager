<?php defined('C5_EXECUTE') or die('Access Denied.');
/**
 * @var array|null                                  $formContent
 * @var array                                       $locations
 * @var array                                       $departments
 * @var array                                       $application_types
 * @var \Concrete\Core\View\View                    $view
 * @var \Concrete\Core\Form\Service\Form            $form
 * @var \Concrete\Core\Form\Service\Widget\DateTime $dth
 * @var \Concrete\Core\Validation\CSRF\Token|null   $token
 * @var \CareersManager\Entity\Job|null             $entity
 */
?>

<?php if ($entity) { ?>
    <div class="ccm-dashboard-header-buttons">
        <button data-launch-dialog="delete-job" class="btn btn-danger"><?php echo t('Delete'); ?></button>
    </div>

    <div style="display: none" data-dialog="delete-job" class="ccm-ui">
        <form data-dialog-form="delete-job-form" method="POST" action="<?php echo $view->action('delete', $entity->getID()); ?>">
            <?php $token->output('delete-job-' . $entity->getID()); ?>
            <p><?php echo t('Are you sure you want to permanently delete "%s"?', h($entity->getTitle())); ?></p>
            <p><strong><?php echo t('This cannot be undone.'); ?></strong></p>
        </form>
        <div class="dialog-buttons">
            <button class="btn btn-secondary float-start" data-dialog-action="cancel"><?php echo t('Cancel'); ?></button>
            <button class="btn btn-danger float-end" data-dialog-action="submit"><?php echo t('Delete'); ?></button>
        </div>
    </div>

    <script>
        $(function() {
            $('[data-launch-dialog="delete-job"]').on('click', function(e) {
                e.preventDefault();
                jQuery.fn.dialog.open({
                    element: $('div[data-dialog="delete-job"]'),
                    modal: true,
                    width: 420,
                    title: <?php echo json_encode(t('Delete Job')); ?>,
                    height: 'auto'
                });
            });

            ConcreteEvent.subscribe('AjaxFormSubmitSuccess', function(e, data) {
                if (data.form === 'delete-job-form') {
                    window.location.href = <?php echo json_encode((string) \URL::to('/dashboard/careers_manager/jobs')); ?>;
                }
            });
        });
    </script>
<?php } ?>

<component-job-form>
    <form method="post" action="<?php echo $view->action('save'); ?>">
        <?php echo $token->output('submit') ?>
        <?php echo ($entity || ($formContent && $formContent['id'])) ? $form->hidden('id', ($formContent) ? $formContent['id'] : $entity->getID()) : ''; ?>

        <fieldset>
            <legend><?php echo t('Details'); ?></legend>

            <div class="form-group">
                <?php echo $form->label('title', t('Title')); ?>
                <div class="input-group">
                    <?php echo $form->text('title', (($formContent) ? $formContent['title'] : (($entity) ? $entity->getTitle() : false))); ?>
                    <span class="input-group-text"><i class="fas fa-asterisk"></i></span>
                </div>
            </div>

            <div class="form-group">
                <?php echo $form->label('slug', t('Slug')); ?>
                <div class="input-group">
                    <?php echo $form->text('slug', (($entity) ? $entity->getSlug() : (($formContent) ? $formContent['slug'] : false)), ($entity ? [ 'readonly' => 'readonly', 'class' => 'disabled' ] : [])); ?>
                    <span class="input-group-text"><i class="fas fa-asterisk"></i></span>
                </div>

                <div class="feedback-container"></div>
            </div>

            <div class="form-group">
                <?php echo $form->label('summary', t('Summary')); ?>
                <?php echo $form->textarea('summary', (($formContent) ? $formContent['summary'] : (($entity) ? $entity->getSummary() : false)), [ 'rows' => 6 ]); ?>
            </div>

            <div class="form-group">
                <?php echo $form->label('description', t('Description')); ?>
                <?php echo app()->make('editor')->outputStandardEditor('description', (($formContent) ? $formContent['description'] : (($entity) ? $entity->getDescription() : false))); ?>
            </div>
        </fieldset>

        <fieldset>
            <legend><?php echo t('Department & Location'); ?></legend>

            <div class="form-group">
                <?php echo $form->label('department', t('Department')); ?>
                <div class="input-group">
                    <select id="department" name="department" class="form-select">
                        <option value=""><?php echo t('Choose a department...'); ?></option>
                        <?php foreach ($departments as $department) {
                            if (is_array($formContent) && array_key_exists('department', $formContent)) {
                                $selected = (string) $formContent['department'] === (string) $department->getID();
                            } else {
                                $selected = $entity && $entity->getDepartment()
                                    && (string) $entity->getDepartment()->getID() === (string) $department->getID();
                            }
                            ?>
                            <option value="<?php echo $department->getID(); ?>" <?php echo $selected ? 'selected' : ''; ?>>
                                <?php echo $department->getName(); ?>
                            </option>
                        <?php } ?>
                    </select>
                    <span class="input-group-text"><i class="fas fa-asterisk"></i></span>
                </div>

                <div class="help-block"><?php echo t('Departments are managed in Careers Manager > <a href="/dashboard/careers_manager/departments" target="_blank">Departments</a>.'); ?></div>
            </div>

            <div class="form-group">
                <?php echo $form->label('location', t('Location')); ?>
                <div class="input-group">
                    <select id="location" name="location" class="form-select">
                        <?php foreach ($locations as $location) {
                            if (is_array($formContent) && array_key_exists('location', $formContent)) {
                                $selected = (string) $formContent['location'] === (string) $location->getID();
                            } else {
                                $selected = $entity && $entity->getLocation()
                                    && (string) $entity->getLocation()->getID() === (string) $location->getID();
                            }
                            ?>
                            <option value="<?php echo $location->getID(); ?>" <?php echo $selected ? 'selected' : ''; ?>>
                                <?php
                                        if (!$location->getIsPrimary()) {
                                            echo $location->getName();
                                        } else {
                                            echo t('%s (Primary)', $location->getName());
                                        }
                            ?>
                            </option>
                        <?php } ?>
                    </select>
                    <span class="input-group-text"><i class="fas fa-asterisk"></i></span>
                </div>

                <div class="help-block"><?php echo t('Locations are managed in Careers Manager > <a href="/dashboard/careers_manager/locations" target="_blank">Locations</a>.'); ?></div>
            </div>
        </fieldset>

        <fieldset>
            <legend><?php echo t('Visibility'); ?></legend>

            <div class="form-group">
                <?php echo $form->label('closingDate', t('Closing Date')); ?>
                <div class="input-group">
                    <?php echo $dth->date('closingDate', (($formContent) ? $formContent['closingDate'] : (($entity && $entity->getClosingDate()) ? $entity->getClosingDate()->format('Y-m-d') : false))); ?>
                    <span class="input-group-text"><i class="fas fa-asterisk"></i></span>
                </div>
            </div>

            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="1" id="active" name="active" <?php echo ($formContent) ? $formContent['active'] : (($entity && $entity->isActive() === true) ? 'checked' : ''); ?> />
                    <label class="form-check-label" for="active">
                        <?php echo t('Active?'); ?>
                    </label>
                </div>
            </div>
        </fieldset>

        <fieldset>
            <legend><?php echo t('Application Settings'); ?></legend>

            <div class="form-group">
                <?php echo $form->label('applicationMethod', t('Application Method')); ?>
                <div class="input-group">
                    <select id="applicationMethod" name="applicationMethod" class="form-select">
                        <?php foreach ($application_types as $option) {
                            $selected = (($formContent) ? $formContent['applicationMethod'] === $option['value'] : (($entity) ? $entity->getApplyMethod() === $option['value'] : false));
                            ?>
                            <option value="<?php echo $option['value']; ?>" <?php echo ($selected) ? 'selected' : ''; ?>><?php echo $option['label']; ?></option>
                        <?php } ?>
                    </select>
                    <span class="input-group-text"><i class="fas fa-asterisk"></i></span>
                </div>
            </div>

            <?php foreach ($application_types as $option) { ?>
                <div class="form-group d-none" data-apptype="<?php echo $option['value']; ?>">
                    <?php echo $form->label('apply' . $option['label'], $option['label']); ?>
                    <?php echo $form->text('apply' . $option['label'], (($formContent) ? $formContent['apply' . $option['label']] : (($entity) ? $entity->__get('apply' . $option['label']) : false))); ?>
                </div>
            <?php } ?>
        </fieldset>

        <div class="ccm-dashboard-form-actions-wrapper">
            <div class="ccm-dashboard-form-actions">
                <a href="<?php echo $view->action(''); ?>" class="btn btn-secondary float-start"><?php echo t('Cancel'); ?></a>
                <?php echo $form->submit('save', ($entity) ? t('Update') : t('Save'), ['class' => 'btn btn-primary float-end']); ?>
            </div>
        </div>
    </form>
</component-job-form>
