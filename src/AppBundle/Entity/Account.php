<?php
    namespace AppBundle\Entity;

    use Doctrine\ORM\Mapping as ORM;
    use Doctrine\Common\Collections\Criteria;
    use Doctrine\Common\Collections\ArrayCollection;
    use Symfony\Component\Serializer\Annotation\Groups;
    use AppBundle\Entity\AbstractGenericEntity;
    use Symfony\Component\Serializer\Mapping\Factory\ClassMetadataFactory;
    // For annotations
    use Doctrine\Common\Annotations\AnnotationReader;
    use Symfony\Component\Serializer\Mapping\Loader\AnnotationLoader;

    /**
     * @ORM\Entity()
     * @ORM\Table(name="accounts",
     *      uniqueConstraints={@ORM\UniqueConstraint(name="accounts_name_unique",columns={"name"})})
     * @ORM\HasLifecycleCallbacks
     */
    class Account extends AbstractGenericEntity{

        /**
         * @ORM\Column(type="string")
         */
        protected $name;

        /**
         * @ORM\Column(type="string")
         */
        protected $description;

        /**
         * @ORM\OneToMany(targetEntity="AccountSheet", mappedBy="account")
         * @var AccountSheet[]
         * @Groups({"account"})
         */
        protected $accountSheets;

        public function __construct($name = null, $description = null){
            $this->accountSheets = new ArrayCollection();
            $this->name = $name;
            $this->description = $description;
        }

        public function getAccountSheets(){
            return $this->accountSheets;
        }

        public function getId(){
            return $this->id;
        }

        public function getName(){
            return $this->name;
        }

        public function getDescription(){
            return $this->description;
        }

        public function setId($id){
            $this->id = $id;
            return $this;
        }

        public function setDescription($str){
            $this->description = $str;
            return $this;
        }

        public function setName($name){
            $this->name = $name;
            return $this;
        }

        public function getSheetById($id) {
            $criteria = Criteria::create()->where(Criteria::expr()->eq("id", $id));

            return $this->getAccountSheets()->matching($criteria)[0];
        }

        public function __destruct(){}
    }
