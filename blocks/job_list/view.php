<?php defined('C5_EXECUTE') or die('Access Denied.');

/**
 * @var \Concrete\Package\CareersManager\Block\JobList\Controller $controller
 * @var \Concrete\Core\Form\Service\Form                          $form
 * @var \CareersManager\Entity\Job                                $job
 * @var \Concrete\Core\Page\Page                                  $page
 * @var string                                                    $title;
 * @var array                                                     $departments
 * @var int                                                       $department
 * @var bool                                                      $showLocationSearch
 * @var string                                                    $postcode;
 * @var array                                                     $radiusOptions;
 * @var int                                                       $radius;
 * @var int                                                       $perPage;
 */
?>

<?php
    if ($controller->getAction() === 'action_detail') {
        \View::element('frontend/job_list/detail', [
            'job' => $job,
            'backUrl' => $controller->getBackLink($page),
        ], 'careers_manager');
    } else { ?>
    <component-job-list>
        <section class="careers-manager__job-list">
            <div class="container">
                <div class="row justify-content-between">
                    <div class="col-12 col-lg-3">
                        <div class="careers-manager__job-list--sticky">
                            <?php if ($title !== '') { ?>
                                <h3><?php echo h($title); ?></h3>
                            <?php } ?>

                            <?php if ($showLocationSearch) { ?>
                                <div class="mb-3">
                                    <?php echo $form->label('postcode', t('Your postcode')); ?>
                                    <?php echo $form->text('postcode', $postcode, [ 'maxlength' => 10 ]); ?>
                                </div>

                                <div class="mb-3">
                                    <?php echo $form->label('radius', t('Distance')); ?>
                                    <?php echo (string) $form->select('radius', $radiusOptions, $radius); ?>
                                </div>
                            <?php } ?>

                            <?php if (!empty($departments)) { ?>
                                <div class="mb-3">
                                    <?php echo $form->label('department', t('Department')); ?>
                                    <select id="department" name="department" class="form-select">
                                        <option value=""><?php echo t('All departments'); ?></option>
                                        <?php foreach ($departments as $id => $name) { ?>
                                            <option value="<?php echo $id; ?>" <?php echo $id === $department ? 'selected' : ''; ?>><?php echo h($name); ?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                            <?php } ?>

                            <button
                                type="submit"
                                class="btn btn-primary careers-manager__job-list--button"
                                data-cid="<?php echo Page::getCurrentPage()->getCollectionID(); ?>"
                                data-page="1"
                                data-limit="<?php echo $perPage; ?>"
                            >
                                <?php echo t('Find jobs'); ?>
                            </button>
                        </div>
                    </div>

                    <div class="col-12 col-lg-8">
                        <div class="careers-manager__job-list--results"></div>
                    </div>
                </div>
            </div>
        </section>
    </component-job-list>
<?php } ?>

<?php /*
<section class="job-list fade__up" id="vacancies" data-job-list="<?php echo $bID; ?>"
    data-job-list-endpoint="<?php echo h($endpoint); ?>"
    data-job-list-cid="<?php echo (int) $cID; ?>"
    data-job-list-limit="<?php echo (int) $limit; ?>">
    <div class="container">

        <?php
        // No page banner on the careers template, so the block heading is the page H1
        $banner = $title ?: (Page::getCurrentPage() ? Page::getCurrentPage()->getCollectionName() : '');
        ?>
        <div class="job-list__intro fade__up--content">
            <?php if ($banner) { ?>
                <h1><?php echo h($banner); ?></h1>
            <?php } ?>
            <?php if ($introText) { ?>
                <p><?php echo nl2br(h($introText)); ?></p>
            <?php } ?>
        </div>

        <form class="job-list__search fade__up--content" method="get" action="<?php echo h($controller->getListUrl(['postcode' => null, 'radius' => null, 'department' => null, 'jp' => null])); ?>#vacancies" role="search" data-job-list-form>
            <div class="job-list__search-field job-list__search-field--postcode">
                <label for="job-postcode-<?php echo $bID; ?>"><?php echo t('Your postcode'); ?></label>
                <input type="text" id="job-postcode-<?php echo $bID; ?>" name="postcode" class="form-control" value="<?php echo h($postcodeInput); ?>" placeholder="<?php echo h(t('e.g. SP1 1EP')); ?>" autocomplete="postal-code" maxlength="10">
            </div>
            <div class="job-list__search-field">
                <label for="job-radius-<?php echo $bID; ?>"><?php echo t('Distance'); ?></label>
                <select id="job-radius-<?php echo $bID; ?>" name="radius" class="form-select">
                    <?php foreach ($radiusOptions as $value => $label) { ?>
                        <option value="<?php echo $value; ?>" <?php echo (int) $value === (int) $radius ? 'selected' : ''; ?>><?php echo h($label); ?></option>
                    <?php } ?>
                </select>
            </div>
            <?php if (!empty($departments)) { ?>
                <div class="job-list__search-field">
                    <label for="job-department-<?php echo $bID; ?>"><?php echo t('Department'); ?></label>
                    <select id="job-department-<?php echo $bID; ?>" name="department" class="form-select">
                        <option value=""><?php echo t('All departments'); ?></option>
                        <?php foreach ($departments as $d) { ?>
                            <option value="<?php echo h($d); ?>" <?php echo $d === $department ? 'selected' : ''; ?>><?php echo h($d); ?></option>
                        <?php } ?>
                    </select>
                </div>
            <?php } ?>
            <div class="job-list__search-actions" data-job-list-actions>
                <button type="submit" class="btn btn-secondary"><?php echo t('Find jobs'); ?></button>
                <a class="job-list__search-reset" data-job-list-clear href="<?php echo h($controller->getListUrl(['postcode' => null, 'radius' => null, 'department' => null, 'jp' => null])); ?>#vacancies"<?php echo $postcodeInput === '' && $department === '' ? ' hidden' : ''; ?>><?php echo t('Clear'); ?></a>
            </div>
        </form>

        <div class="job-list__results fade__up--content" aria-live="polite" aria-busy="true" data-job-list-results>
            <p class="job-list__message job-list__message--loading"><?php echo t('Loading vacancies…'); ?></p>
            <noscript>
                <p class="job-list__message"><?php echo t('Please enable JavaScript to search our current vacancies.'); ?></p>
            </noscript>
        </div>
    </div>
</section>
*/ ?>
