<?php defined('C5_EXECUTE') or die('Access Denied.');

$form = Core::make('helper/form');
?>

<div class="alert alert-info">
    <?php echo t('Jobs are managed in Dashboard > Careers > Jobs.'); ?>
</div>

<div class="form-group">
    <?php echo $form->label('title', t('Heading')); ?>
    <?php echo $form->text('title', isset($title) ? $title : t('Current vacancies')); ?>
</div>

<div class="form-group">
    <div class="form-check">
        <input class="form-check-input" type="checkbox" value="1" id="showLocationSearch" name="showLocationSearch" <?php echo (isset($showLocationSearch) && $showLocationSearch > 0) ? 'checked' : ''; ?> />
        <label class="form-check-label" for="showLocationSearch">
            <?php echo t('Show Location Search'); ?>
        </label>
    </div>
</div>

<div class="form-group">
    <?php echo $form->label('perPage', t('Jobs per page')); ?>
    <?php echo $form->number('perPage', isset($perPage) && $perPage ? $perPage : 10, ['min' => 1, 'max' => 100]); ?>
</div>
