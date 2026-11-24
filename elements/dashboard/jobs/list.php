<?php defined('C5_EXECUTE') or die('Access Denied.');
/**
 * @var \CareersManager\Search\Result\Job\Jobs $result
 */
?>

<div class="ccm-dashboard-content-full">
    <?php
        /** @var bool $hasLocations */
        if (empty($items)) {
            ?>
        <?php if (!$hasLocations) { ?>
            <div class="alert alert-danger">
                <?php echo t('No locations - add one <a href="/dashboard/careers_manager/locations/add">here</a>.') ?>
            </div>
        <?php } ?>

        <div class="alert alert-warning">
            <?php echo t('No items found.') ?>
        </div>
    <?php } else { ?>

        <div class="table-responsive">
            <table class="ccm-search-results-table">
                <thead>
                    <tr>
                        <?php foreach ($result->getColumns() as $column) { ?>
                            <?php if ($column->isColumnSortable()) { ?>
                                <th class="<?php echo $column->getColumnStyleClass(); ?>">
                                    <a href="<?php echo $column->getColumnSortURL(); ?>"><?php echo h($column->getColumnTitle()); ?></a>
                                </th>
                            <?php } else { ?>
                                <th><span><?php echo h($column->getColumnTitle()); ?></span></th>
                            <?php } ?>
                        <?php } ?>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($items as $item) { ?>
                        <tr data-details-url="<?php echo h($item->getViewUrl()); ?>">
                            <?php foreach ($item->getColumns() as $column) { ?>
                                <td><?php echo nl2br(h($column->getColumnValue())); ?></td>
                            <?php } ?>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>

        <?php
                    /** @var string $pagination */
                    if ($pagination) {
                        ?>
            <div class="ccm-search-results-pagination">
                <?php echo $pagination ?>
            </div>
        <?php } ?>

    <?php } ?>

</div>

<div class="ccm-dashboard-header-buttons">
    <?php /** @var \Concrete\Core\View\View $view */ ?>
    <a href="<?php echo $view->action('add'); ?>" class="btn <?php echo (!$hasLocations) ? 'btn-danger disabled' : 'btn-primary'; ?>">
        <?php echo t($hasLocations ? 'Create New' : 'No locations'); ?>
    </a>
</div>
